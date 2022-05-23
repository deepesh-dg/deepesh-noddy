import { createTransport, SendMailOptions } from "nodemailer";
import { Config } from "../../conf/Config";
import { MailConfig } from "../../conf/Mail";
import { Logger } from "../Log/Logger";
import { promiseHandle } from "../PromiseHandler/PromiseHandler";

const debug: Logger = new Logger({ moduleName: "core:lib:mail" });

export interface IMailConfig {
    to: string;
    subject: string;
    mailType: "text" | "html";
    message: string;
}

export class Mail {
    private _serverStatus: boolean = false;
    private _mailConfig: any = {
        auth: {
            user: MailConfig.get("user"),
            pass: MailConfig.get("password"),
        },
    };
    private _transporter;

    constructor() {
        if (MailConfig.get("service"))
            this._mailConfig.service = MailConfig.get("service");
        else {
            this._mailConfig.host = MailConfig.get("host");
            this._mailConfig.port = MailConfig.get("port");
            this._mailConfig.secure = false;
        }
        this._transporter = createTransport(this._mailConfig);
    }

    public static async conn() {
        const mailObj = new Mail();
        return await mailObj.serverStatus(true);
    }

    private notifyServerStatus(): void {
        if (this._serverStatus) debug.debug("Mail Server is Up and Running...");
        else debug.debug("Mail Server is Down...");
    }

    public async serverStatus(debugg: boolean = false): Promise<boolean> {
        if (debugg) debug.debug("Checking Mail Server");
        const checkMail = await promiseHandle<boolean>(
            this._transporter.verify()
        );
        checkMail
            .map((success) => (this._serverStatus = success))
            .mapErr((error) => {
                debug.debug(error);
                this._serverStatus = false;
            });
        if (debugg) this.notifyServerStatus();
        return this._serverStatus;
    }

    public async send(
        { to, subject, mailType, message }: IMailConfig,
        forceMail: boolean = false
    ): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            if (Config.get("production") || forceMail) {
                if (!this._serverStatus) await this.serverStatus();

                if (this._serverStatus) {
                    const mailOptions: SendMailOptions = {
                        from: `${MailConfig.get("name")}<${MailConfig.get(
                            "emailid"
                        )}>`,
                        to,
                        subject,
                    };
                    if (mailType === "html") mailOptions.html = message;
                    else if (mailType === "text") mailOptions.text = message;

                    const sendMail = await promiseHandle(
                        this._transporter.sendMail(mailOptions)
                    );

                    sendMail
                        .map(() => resolve(true))
                        .mapErr((error) => reject(error));
                } else {
                    reject("Mail Server is not Running");
                }
            } else {
                resolve(true);
            }
        });
    }

    public static async run(): Promise<boolean> {
        const mailObj = new Mail();
        return await mailObj.serverStatus();
    }
}

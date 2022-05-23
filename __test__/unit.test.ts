import { api } from "./api";

api({
    name: "Welcome",
    url: "welcome",
    method: "get",
    expect: 200,
});

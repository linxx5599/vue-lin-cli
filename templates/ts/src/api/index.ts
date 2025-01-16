import request from "@/utils/request";
import { Home } from "./type";
export function geHome() {
  return request<Home>({
    url: "/home",
    method: "get",
  });
}

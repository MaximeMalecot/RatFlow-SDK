import * as dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}
export const API_ENDPOINT = process.env.API_ENDPOINT??"https://ratflow-def8463-yjzy6rz7eq-od.a.run.app/analytics";

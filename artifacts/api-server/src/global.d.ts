import type pino from "pino";

declare module "http" {
  interface IncomingMessage {
    log: pino.Logger;
  }
}

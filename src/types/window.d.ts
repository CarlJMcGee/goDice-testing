import GoDice from "../utils/GoDice/goDice";

declare global {
  interface Window {
    GoDice: GoDice;
  }
}

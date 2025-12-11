export default class Connection {
  private static baseURL = "https://ui20251201130755-a5ewb6a4d6bndub9.italynorth-01.azurewebsites.net/api/";

  public static getBaseURL(): string {
    return this.baseURL;
  }
}
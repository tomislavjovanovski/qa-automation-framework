import { joinUrl } from "../../shared/utils/url.utils";

export class UrlResolver {
  static resolve(rootUrl: string, pathPrefix?: string): string {
    if (!pathPrefix || pathPrefix.trim() === "/") {
      return rootUrl.endsWith("/") ? rootUrl : `${rootUrl}/`;
    }

    return joinUrl(rootUrl, this.normalizePathPrefix(pathPrefix));
  }

  private static normalizePathPrefix(pathPrefix?: string): string {
    const trimmed = pathPrefix?.trim() ?? "/";

    if (!trimmed || trimmed === "/") {
      return "/";
    }

    return `${trimmed.replace(/^\/+|\/+$/g, "")}/`;
  }
}

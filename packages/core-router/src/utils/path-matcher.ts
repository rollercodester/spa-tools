export class PathMatcher {
  private pathTemplate: string;

  constructor(pathTemplate: string) {
    this.pathTemplate = pathTemplate;
  }

  public match(path: string): Record<string, unknown> | null {
    if (!this.pathTemplate || !path) {
      return null;
    }

    const normTemplate = this.pathTemplate.startsWith('/') ? this.pathTemplate.slice(1) : this.pathTemplate;
    const normPath = path.startsWith('/') ? path.slice(1) : path;

    const templateSegments = normTemplate.split('/');
    const pathSegments = normPath.split('/');

    if (templateSegments.length !== pathSegments.length) {
      return null;
    }

    const params: Record<string, string> = {};

    for (let i = 0; i < templateSegments.length; i++) {
      const templateSegment = templateSegments[i];
      const pathSegment = pathSegments[i];

      if (templateSegment === '*') {
        continue;
      }

      if (templateSegment && templateSegment.startsWith(':')) {
        const paramName = templateSegment.slice(1);
        if (pathSegment !== undefined) {
          params[paramName] = pathSegment;
        }
        continue;
      }

      if (templateSegment !== pathSegment) {
        return null;
      }
    }

    return params;
  }
}

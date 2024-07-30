class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(url: string, params: Record<string, string> = {}): string {
    const urlObj = new URL(`${this.baseUrl}${url}`);
    Object.keys(params).forEach(key => urlObj.searchParams.append(key, params[key]));
    return urlObj.toString();
  }

  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  }

  public async get<T>(url: string, params: Record<string, string> = {}, options: RequestInit = {}): Promise<T> {
    const fullUrl = this.buildUrl(url, params);
    return this.request<T>(fullUrl, { ...options, method: "GET" });
  }

  public async post<T>(
    url: string,
    data: any,
    params: Record<string, string> = {},
    options: RequestInit = {}
  ): Promise<T> {
    const fullUrl = this.buildUrl(url, params);
    return this.request<T>(fullUrl, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  public async put<T>(
    url: string,
    data: any,
    params: Record<string, string> = {},
    options: RequestInit = {}
  ): Promise<T> {
    const fullUrl = this.buildUrl(url, params);
    return this.request<T>(fullUrl, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  public async delete<T>(url: string, params: Record<string, string> = {}, options: RequestInit = {}): Promise<T> {
    const fullUrl = this.buildUrl(url, params);
    return this.request<T>(fullUrl, { ...options, method: "DELETE" });
  }
}

const httpClient = new HttpClient(`${process.env.NEXT_PUBLIC_DOMAIN}/api` || "");
export default httpClient;

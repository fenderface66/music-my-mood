import "whatwg-fetch";

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const errorObj = await response.json();
    throw new Error(JSON.stringify(errorObj.errors));
  }
}

type FetchRequestMode =
  | "cors"
  | "no-cors"
  | "cors-with-forced-preflight"
  | "same-origin"
  | "navigate";
type FetchRequestCredentials = "omit" | "same-origin" | "include";
type FetchRequestRedirect = "follow" | "error" | "manual";
type FetchRequestCache =
  | "default"
  | "no-store"
  | "reload"
  | "no-cache"
  | "force-cache";
type FetchResponseType = "basic" | "cors" | "error" | "opaque";
type FetchReferrerPolicy =
  | "no-referrer"
  | "no-referrer-when-downgrade"
  | "origin";

type FetchHeaders = {
  append?: () => void,
  delete?: (name: string) => void,
  entries?: () => Iterator<*>,
  get?: (name: string) => string,
  getAll?: (name: string) => Array<string>,
  has?: (name: string) => Boolean,
  keys?: () => Iterator<string>,
  set?: (name: string, value: any) => void,
  values?: Iterator<*>
};

type FetchOptions = {
  method?: string,
  headers?: FetchHeaders,
  body?: Blob | ArrayBuffer | FormData | URLSearchParams | string,
  mode?: FetchRequestMode | Object,
  credentials?: FetchRequestCredentials,
  cache?: FetchRequestCache,
  redirect?: FetchRequestRedirect,
  referrer?: string,
  integrity?: string
};

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default async function request(
  url: string,
  options: FetchOptions
): Promise<void> {
  // $FlowFixMe
  return fetch(url, options)
    .then(await checkStatus)
    .then(parseJSON);
}

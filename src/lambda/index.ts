
import axios, { AxiosResponse } from 'axios';

export interface Response {
  readonly title: string;
  readonly headers: any;
  readonly status: number;
  readonly body: any;
}

export async function HttpGet(url: string): Promise<Response> {
  return HttpAction('get', url);
}

export async function HttpAction(action: string, url: string): Promise<Response> {
  const apiClient = axios.create({
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let response: AxiosResponse<any>;

  switch (action) {
    case 'get':
      response = await apiClient.get(url);
      break;
    case 'post':
      response = await apiClient.post(url);
      break;
    case 'put':
      response = await apiClient.put(url);
      break;
    case 'head':
      response = await apiClient.head(url);
      break;
    default:
      response = await apiClient.get(url);
      break;
  }

  const title: string = parseTitle(response.data);
  const resp: Response = {
    title: title,
    headers: response.headers,
    status: response.status,
    body: response.data,
  };
  return resp;
}

function parseTitle(body: string) {
  let match = body.match(/<title>([^<]*)<\/title>/); // regular expression to parse contents of the <title> tag
  if (!match || typeof match[1] !== 'string') {
    // unable to parse the title
    return '';
  } else {
    return match[1];
  }
}

export async function onEvent(event: any) {
  console.log('Event: %j', event);
  console.log('Got parameter:', process.env.PARAMETER);
  const requestType = event.RequestType;
  switch (requestType) {
    case 'Create': return onCreate(event); break;
    case 'Update': return onUpdate(event); break;
    case 'Delete': return onDelete(event); break;
    default: console.log(`invalid request type ${requestType}`);
  }
}

export async function onCreate(event: any) {
  const props = event.ResourceProperties;
  const url = props.url;
  const resp = await HttpGet(url);
  const data = {
    status: resp.status,
    title: resp.title,
    // we only return first 256 characters of the body
    body: resp.body.substr(0, 256),
    url,
  };
  return { Data: data };
}

export async function onUpdate(event: any) {
  return onCreate(event);
}

export async function onDelete(event: any) {
  return event;
}

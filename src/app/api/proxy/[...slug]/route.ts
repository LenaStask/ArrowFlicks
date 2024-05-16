const TMDB_API_URL = 'https://api.themoviedb.org/3';
const TMBD_API_KEY = 'eccf4ea17398bb5366db0f8c4343a3f8';

export async function GET(request: Request, { params }: { params: { slug: string[] } }) {
  const path = params.slug.join('/');

  const url = new URL(request.url);
  const urlParams = url.searchParams;

  urlParams.append('api_key', TMBD_API_KEY);
  
  const response = await fetch(`${TMDB_API_URL}/${path}?${urlParams.toString()}`);
  const movies = await response.json()

  return Response.json(movies);
}

const knownSites = [
  'youtube.com',
  'youtu.be',
  'tape.xyz',
  'open.spotify.com',
  'spotify.link',
  'soundcloud.com',
  'oohlala.xyz'
];

const pickUrlSites = ['open.spotify.com'];

const spotifyTrackUrlRegex =
  /^ht{2}ps?:\/{2}open\.spotify\.com\/track\/[\dA-Za-z]+(\?si=[\dA-Za-z]+)?$/;
const spotifyPlaylistUrlRegex =
  /^ht{2}ps?:\/{2}open\.spotify\.com\/playlist\/[\dA-Za-z]+(\?si=[\dA-Za-z]+)?$/;
const spotifyShortLinkRegex = /^https?:\/\/spoti\.fi\/[\dA-Za-z]+$/;
const oohlalaUrlRegex =
  /^ht{2}ps?:\/{2}oohlala\.xyz\/playlist\/[\dA-Fa-f-]+(\?si=[\dA-Za-z]+)?$/;
const soundCloudRegex =
  /^ht{2}ps?:\/{2}soundcloud\.com(?:\/[\dA-Za-z-]+){2}(\?si=[\dA-Za-z]+)?$/;
const youtubeRegex =
  /^https?:\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w-]+)(?:\?.*)?$/;
const tapeRegex =
  /^https?:\/\/tape\.xyz\/watch\/[\dA-Za-z-]+(\?si=[\dA-Za-z]+)?$/;

const generateIframe = (
  embedUrl: string | null,
  url: string
): string | null => {
  const universalSize = `width="560" height="315"`;
  const parsedUrl = new URL(url);
  const hostname = parsedUrl.hostname.replace('www.', '');
  const pickedUrl = pickUrlSites.includes(hostname) ? url : embedUrl;

  if (!knownSites.includes(hostname) || !pickedUrl) {
    return null;
  }

  switch (hostname) {
    case 'youtube.com':
    case 'youtu.be':
      if (youtubeRegex.test(url)) {
        return `<iframe src="${pickedUrl}" ${universalSize} allow="accelerometer; encrypted-media" allowfullscreen></iframe>`;
      }

      return null;
    case 'tape.xyz':
      if (tapeRegex.test(url)) {
        return `<iframe src="${pickedUrl}" ${universalSize} allow="accelerometer; encrypted-media" allowfullscreen></iframe>`;
      }

      return null;
    case 'open.spotify.com':
      const spotifySize = `style="max-width: 560px;" width="100%"`;
      if (spotifyTrackUrlRegex.test(url)) {
        const spotifyUrl = pickedUrl.replace('/track', '/embed/track');
        return `<iframe src="${spotifyUrl}" ${spotifySize} height="155" allow="encrypted-media"></iframe>`;
      }

      if (spotifyPlaylistUrlRegex.test(url)) {
        const spotifyUrl = pickedUrl.replace('/playlist', '/embed/playlist');
        return `<iframe src="${spotifyUrl}" ${spotifySize} height="380" allow="encrypted-media"></iframe>`;
      }

      return null;
    case 'spotify.link':
      const spotifyShortLinkSize = `style=max-width:560px; width:100%;`;
      if (spotifyShortLinkRegex.test(url)) {
        const spotifyUrl = pickedUrl.replace(
          'spotify.link',
          'open.spotify.com'
        );
        return `<iframe src="${spotifyUrl}" ${spotifyShortLinkSize} height="155" allow="encrypted-media"></iframe>`;
      }

      return null;
    case 'soundcloud.com':
      if (soundCloudRegex.test(url)) {
        return `<iframe src="${pickedUrl}" ${universalSize}></iframe>`;
      }

      return null;
    case 'oohlala.xyz':
      if (oohlalaUrlRegex.test(url)) {
        return `<iframe src="${pickedUrl}" ${universalSize}></iframe>`;
      }

      return null;
    default:
      return `<iframe src="${pickedUrl}" width="560"></iframe>`;
  }
};

export default generateIframe;

// src/app/utils/utils.js

const iptvJsonLinks = [
  "https://iptv-org.github.io/api/channels.json",
  "https://iptv-org.github.io/api/feeds.json",
  "https://iptv-org.github.io/api/streams.json",
  "https://iptv-org.github.io/api/guides.json",
  "https://iptv-org.github.io/api/categories.json",
  "https://iptv-org.github.io/api/languages.json",
  "https://iptv-org.github.io/api/countries.json",
  "https://iptv-org.github.io/api/subdivisions.json",
  "https://iptv-org.github.io/api/regions.json",
  "https://iptv-org.github.io/api/timezones.json",
  "https://iptv-org.github.io/api/blocklist.json",
];

 const buildIptv = () => {
  // new container | data type
  const listOfChannels = [];
  // collect and assign util done
  iptvJsonLinks.map((link, index) => {
    const result = link.match(/\/([a-z]+)\.json$/i);
    listOfChannels.push({
      id: (index + 1),
      route: result[0],
      name: result[1],
      url: link,
    });
  });

  // return it
  return listOfChannels;
};

console.log(buildIptv());


export default buildIptv;


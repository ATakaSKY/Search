export const processHackerNewsResults = async searchData => {
  let results = [];

  // const allRequest = searchData.hits.map(data => {
  //   return `https://hn.algolia.com/api/v1/users/${data.author}`;
  // });

  // const casesFetched = urls.map(async url => {
  //   const response = await fetch(url, { signal });
  //   return response.json();
  // });
  // const allData = await Promise.all(allRequest);

  for (let data of searchData.hits) {
    const response = await fetch(
      `https://hn.algolia.com/api/v1/users/${data.author}`
    );
    const responseData = await response.json();

    results.push({
      title: data.title,
      author: data.author,
      url: data.url,
      sub_count: responseData.submission_count
    });
  }

  return results;
};

export const processWikiResults = searchData => {
  let results = [];

  const [, titles, , links] = searchData;

  results = titles.map((title, i) => {
    return {
      title: title,
      author: title,
      url: links[i],
      sub_count: "NA"
    };
  });

  return results;
};

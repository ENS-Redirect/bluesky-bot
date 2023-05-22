exports.helloWorld = async (req, res) => {
  
  res.set('Access-Control-Allow-Origin', '*');

  
  const ens = req.query.ens;
  const { BskyAgent, RichText } = require("@atproto/api");


  async function sendPost(text) {
  const agent = new BskyAgent({ service: "https://bsky.social" });
  await agent.login({
    identifier: ".............", //bsky.app username
    password: ".............", //bsky.app password
  });
  const richText = new RichText({ text });
  await richText.detectFacets(agent);
  await agent.post({
    text: richText.text,
    facets: richText.facets,
  });
}

  if(req.query.status == "1") {

  var geturl = req.query.url;
  var decoded = decodeURIComponent(geturl);
  var url = decoded.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
  
  sendPost("🎯 New #ENS ⮕ DNS Redirect!\n\nDomain: "+ens+" now seamlessly redirects to "+url+"! Check it out: https://"+ens+".limo");
  res.send();
  }

  else if(req.query.status == "2") {

  sendPost("🥳 New #ENS Web3 Profile!\n\nIntroducing "+ens+": https://"+ens+".limo");
  res.send();
  } 

  else{
  res.send();
  } 
  
}};

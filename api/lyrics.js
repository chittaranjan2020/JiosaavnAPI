const axios = require('axios')

module.exports = async(req, res) => {
    var reqId = req.query.id
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate")
    res.setHeader("Open-Source", "https://github.com/Oshekher/JiosaavnAPI")
    res.setHeader("Edited-By", "Saksham Shekher, https://github.com/Oshekher/")

    axios({
        method: 'get',
        url: `https://www.jiosaavn.com/api.php?__call=lyrics.getLyrics&ctx=web6dot0&api_version=4&_format=json&_marker=0%3F_marker=0&lyrics_id=${reqId}`
    })

    .then(async function(response) {
            var data = JSON.parse(JSON.stringify(response.data).replace(/&amp;/gi, "&").replace(/&copy;/gi, "©"))

            res.json({
                lyrics: data.lyrics.replace(/"/gi, "'"),
                repo_url: "https://github.com/Oshekher/JiosaavnAPI"
            })

        })
        .catch(function(error) {
            res.json({ result: "false" })
        })
}

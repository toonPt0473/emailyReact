const { redirectDomain } = require('../../config/keys')

module.exports = (survey) => {
    return `
        <html>
            <body>
                <div style="text-align:center">
                    <h3>i'd like your input</h3>
                    <p>pls answer question</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${redirectDomain}/api/surveys/thank">yes</a>
                    </div>
                    <div>
                        <a href="${redirectDomain}/api/surveys/thank">no</a>
                    </div>
                </div>
            </body>
        </html>
    `;
};
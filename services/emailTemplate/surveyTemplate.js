const { redirectDomain } = require('../../config/keys')

module.exports = (survey , user , thisSurvey) => {
    return `
        <html>
            <body>
                <div style="text-align:center">
                    <h3>We need you response</h3>
                    <p>Please click on Yes or No</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${redirectDomain}/api/surveys/thank/${user.id}/${thisSurvey.id}/yes">Yes</a>
                    </div>
                    <div>
                        <a href="${redirectDomain}/api/surveys/thank/${user.id}/${thisSurvey.id}/no">No</a>
                    </div>
                </div>
            </body>
        </html>
    `;
};
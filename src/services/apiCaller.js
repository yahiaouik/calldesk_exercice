import axios from 'axios'

const URL = "https://x7s4xjtt86.execute-api.eu-west-1.amazonaws.com/v1/"
const Api_key = "gse6HCskPY7zsv54OJW053d9pJ4u4cx17svMUdM3"


// get calls from API by an HTTP request from botId and a duration
export async function getCallsFromAPI(botId, from, to) {
	return await axios ({
	url: URL + "workspaces/calldesk-product/bots/"+botId+"/calls?from="+new Date(from).getTime()+"&to="+ new Date(to).getTime(),
    method: "GET",
    headers: {"x-api-key" : Api_key}
})
}

// get recording for a specific call from API from botId, sessionId and the call start time
export async function getRecordingFromAPI(botId,sessionId, discussionStartTime){
    return await axios ({
        url: URL + "workspaces/calldesk-product/bots/"+botId+"/calls/"+sessionId+"/recording?discussionStartTime="+discussionStartTime,
        method: "GET",
        headers: {"x-api-key" : Api_key}
    })
}

// get transcript for a specific call from API from botId, sessionId and the call start time
export async function getTranscriptFromAPI(botId,sessionId, discussionStartTime){
    return await axios ({
            url: URL + "workspaces/calldesk-product/bots/"+botId+"/calls/"+sessionId+"/transcript?discussionStartTime="+discussionStartTime,
            method: "GET",
            headers: {"x-api-key" : Api_key}
        })
}
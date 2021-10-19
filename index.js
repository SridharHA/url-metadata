/**
 * Lambda Function that would do the following:
 * 1. Read the data from API gateway
 * 2. get metadata for the url
 * 3. Return the successful records or error codes to caller.
 */

const AWS = require("aws-sdk");
const urlMetadata = require('url-metadata');

exports.handler = async (event) => {
  console.log(event);
  let inputRequest = JSON.parse(event.body);
  // Header for response method
  let url = inputRequest.url;
  let headers = {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "*",
    Accept: "*/",
  };
  let metadataInfo = "";
  let errorFlag = false;
  await urlMetadata(url).then(
    function (metadata) {
      // success handler
      console.log(metadata);
      metadataInfo = metadata;
    },
    function (error) {
      // failure handler
      console.log(error);
      metadataInfo = error;
      errorFlag = true;
    }
  );
  // return response
  return {
    statusCode: errorFlag ? 200 : 500,
    headers: headers,
    body: JSON.stringify(
      {
        message: metadataInfo,
      },
      null,
      2
    ),
  };
};

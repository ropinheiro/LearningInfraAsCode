import * as aws from "@pulumi/aws";
import * as fs from "fs";

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("hello-world", {
    website: {
        indexDocument: "index.html"
    }
});

const homepage = new aws.s3.BucketObject("index.html", {
    bucket: bucket,
    acl: aws.s3.PublicReadAcl,
    content: fs.readFileSync("./index.html").toString(),
    contentType: "text/html"
});

// Export the name of the bucket
export const bucketName = bucket.id;
export const url = bucket.websiteEndpoint;
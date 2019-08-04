workflow "New workflow" {
  on = "push"
  resolves = ["Deploy to S3"]
}

action "yarn" {
  uses = "yarn"
  runs = "build"
  secrets = ["REACT_APP_FOOD_API_KEY"]
}

action "Deploy to S3" {
  uses = "actions/aws/cli@efb074ae4510f2d12c7801e4461b65bf5e8317e6"
  needs = ["yarn"]
  runs = "sync build s3://food-search-ts --acl public-read"
  secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]
}

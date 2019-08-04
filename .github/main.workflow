workflow "New workflow" {
  on = "push"
  resolves = ["Deploy to S3"]
}

action "yarn" {
  uses = "nuxt/actions-yarn@master"
  runs = "build"
  secrets = ["REACT_APP_FOOD_API_KEY"]
}

action "Deploy to S3" {
  uses = "actions/aws/cli@master"
  needs = ["yarn"]
  runs = "sync build s3://food-search-ts --acl public-read"
  secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]
}

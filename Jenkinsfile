pipeline {
    agent {
        docker {
            image 'node:latest'
            args '-p 3000:3000'
        }
    }

    environment {
        CI = 'true'
        HOME = '.'
        npm_config_cache = 'npm-cache'
    }

    stages {

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            parallel {
                stage('Deploy | Staging') {
                    when {
                        branch 'develop'
                    }
                    steps {
                        withAWS(region:'us-east-1',credentials:'7731c54c-1e9c-4714-a827-db0182be57d1') {
                            s3Delete(bucket: 'food-search-ts-staging', path:'**/*')
                            s3Upload(bucket: 'food-search-ts-staging', workingDir:'build', includePathPattern:'**/*');
                        }
                    }
                }
                
                stage('Deploy | Production') {
                    when {
                        branch 'master'
                    }
                    steps {
                        withAWS(region:'us-east-1',credentials:'7731c54c-1e9c-4714-a827-db0182be57d1') {
                            s3Delete(bucket: 'food-search-ts', path:'**/*')
                            s3Upload(bucket: 'food-search-ts', workingDir:'build', includePathPattern:'**/*');
                        }
                    }
                }
            }
        }
    }
}

pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'jeevanjacob11'
    }

    stages {

        stage('Test') {
    steps {
        sh 'cd server && npm install && npm test'
    }
}

        stage('Build Backend Docker Image') {
            steps {
                sh 'docker build -t task-manager-backend ./server'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                sh 'docker build -t task-manager-frontend ./client'
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USER" --password-stdin

                        docker tag task-manager-backend:latest $DOCKER_USER/task-manager-backend:latest
                        docker tag task-manager-frontend:latest $DOCKER_USER/task-manager-frontend:latest

                        docker push $DOCKER_USER/task-manager-backend:latest
                        docker push $DOCKER_USER/task-manager-frontend:latest

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                    cd /workspace/task-manager-devops

                    docker compose -p task-manager-devops pull

                    docker compose -p task-manager-devops up -d
                '''
            }
        }
    }
}
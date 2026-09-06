pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                echo 'Jenkins pipeline is working!'
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
    }
}
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    docker.image('node:14').inside {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    docker.image('alpine').inside {
                        sh '''
                        echo "Copy Build File"

                        chown jenkins:jenkins -R /homepage/orummmedia/orummmedia_front/*
                        chmod 755 -R /homepage/orummmedia/orummmedia_front/*
                        rm -rf /homepage/orummmedia/orummmedia_front/build/*
                        cp -rf /var/lib/jenkins/workspace/orummmedia_front/build/* /homepage/orummmedia/orummmedia_front/build/
                        find /homepage/orummmedia/orummmedia_front -name .svn -print0 | xargs -0 rm -rf
                        '''
                    }
                }
            }
        }
    }
}

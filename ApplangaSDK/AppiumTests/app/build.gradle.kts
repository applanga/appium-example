plugins {
    application
}
repositories {
    mavenCentral()
}
dependencies {
    testImplementation("org.junit.jupiter:junit-jupiter:5.9.1")
    testImplementation("io.appium:java-client:8.2.1")
    testImplementation("org.seleniumhq.selenium:selenium-java:4.6.0")
    testImplementation("org.json:json:20210307")
}
tasks.named<Test>("test") {
    // Use JUnit Platform for unit tests.
    useJUnitPlatform()
}

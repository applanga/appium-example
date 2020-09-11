import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:applanga_flutter/applanga_flutter.dart';
import 'localisations.dart';

void main() {
  runApp(new Demo());
}

class Demo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      localizationsDelegates: [
        const ApplangaLocalizationsDelegate(),
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ],
      supportedLocales: [
        const Locale('en'),
        const Locale('de')
      ],
      // Watch out: MaterialApp creates a Localizations widget
      // with the specified delegates. DemoLocalizations.of()
      // will only find the app's Localizations widget if its
      // context is a child of the app.
      home: new DemoApp(),
    );
  }
}

class DemoApp extends StatefulWidget {
  DemoAppState createState() => new DemoAppState();
}
class DemoAppState extends State<DemoApp>{

  void _applangaUpdate() async{
    await ApplangaFlutter.update();
    await ApplangaLocalizations.of(context).localizeMap();
    setState(() {
      //do nothing just rebuild widget tree -> important
    });
  }

  void initState() {
    super.initState();
    _applangaUpdate();
  }

  @override
  Widget build(BuildContext context) {
    setScreenTag(context,"test");
    return new Scaffold(
      appBar: new AppBar(
        //title: new Text(DemoLocalizations.of(context).title),
        title: new Text("Page 1"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
                ApplangaLocalizations.of(context).get("label-1")
            ),
            FlatButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => SecondRoute()),
                );
              },
              key: Key("OpenSecondPage"),
              child: Text(
                  ApplangaLocalizations.of(context).get("button-label")
              ),
            )
          ],
        ),
      ),
    );
  }

}
class SecondRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    setScreenTag(context,"test2");
    return Scaffold(
      appBar: new AppBar(
        //title: new Text(DemoLocalizations.of(context).title),
        title: new Text("Page 2"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
                ApplangaLocalizations.of(context).get("label-2")
            ),
            FlatButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => SecondRoute()),
                );
              },
              key: Key("OpenSecondPage"),
              child: Text(
                  ApplangaLocalizations.of(context).get("button-label")
              ),
            )
          ],
        ),
      ),
    );
  }
}
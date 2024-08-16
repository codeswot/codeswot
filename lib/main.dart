import 'package:codeswot/app/app.dart';
import 'package:flutter/material.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get/get_core/src/get_main.dart';

Future<void> main() async {
  await initApp();
  runApp(
    const ProviderScope(
      child: Codeswot(),
    ),
  );
}

initApp() async {
  Get.log('Initializing services ⏳..');
  WidgetsBinding widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
  FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);
  FlutterNativeSplash.remove();
  Get.log('Initialization done ✅ ...');

}

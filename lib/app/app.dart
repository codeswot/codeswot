import 'package:codeswot/features/main/home.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class Codeswot extends StatelessWidget {
  const Codeswot({super.key});

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(1920, 1080),
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (_, child) {
        final textTheme = Theme.of(context).textTheme;

        return MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'Codeswot',
          theme: ThemeData(            
            textTheme: GoogleFonts.nunitoTextTheme(textTheme)            
          ),
          home: child,
        );
      },
      child: const HomePage(),
    );
  }
}

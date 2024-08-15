import 'package:codeswot/main/home.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:responsive_framework/responsive_framework.dart';

class Codeswot extends StatelessWidget {
  const Codeswot({super.key});

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size.fromWidth(1280),
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
          builder: (context, child) => ResponsiveBreakpoints.builder(
            child: child!,
            breakpoints: const [
              Breakpoint(start: 0, end: 599, name: MOBILE),
              Breakpoint(start: 600, end: 1050, name: TABLET),
              Breakpoint(start: 1051, end: 1440, name: DESKTOP),
              Breakpoint(start: 1441, end: double.infinity, name: '4K'),
            ],
          ),
          home: child,
        );
      },
      child: const HomeMain(),
    );
  }
}

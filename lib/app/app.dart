import 'package:codeswot/features/main/home.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:responsive_framework/responsive_framework.dart';

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
          builder: (context, child) => ResponsiveBreakpoints.builder(
            child: child!,
            breakpoints: [
              const Breakpoint(start: 0, end: 450, name: MOBILE),
              const Breakpoint(start: 451, end: 800, name: TABLET),
              const Breakpoint(start: 801, end: 1920, name: DESKTOP),
              const Breakpoint(start: 1921, end: double.infinity, name: '4K'),
            ],
          ),
          home: child,
        );
      },
      child: const HomeMain(),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class HomePage extends ConsumerWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      backgroundColor: const Color(0xff0A192F),
      body: Container(
        padding: EdgeInsets.symmetric(horizontal: 32.w),
        width: 1.sw,
        height: 1.sh,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SelectableText.rich(
              textAlign: TextAlign.center,  
              TextSpan(
                text: 'Hello World! 👋🏾, I am ',
                style: TextStyle(
                  fontSize: 150.sp,
                  color: const Color(0xffE6F1FF),
                ),
                children: [
                  TextSpan(
                    text: 'Codeswot',
                    style: GoogleFonts.sourceCodePro(
                      fontSize: 200.sp,
                      color: const Color(0xff64FFDA),
                      letterSpacing: 0.sp,
                      wordSpacing: 0.sp,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

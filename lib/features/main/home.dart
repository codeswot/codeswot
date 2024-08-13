import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class HomePage extends ConsumerWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      backgroundColor: const Color(0xff0A192F),
      body: Center(
        child: RichText(
          textAlign: TextAlign.center,
          softWrap: true,
          text: TextSpan(
            text: 'Hi 👋🏾, I am ',
            style: TextStyle(
              fontSize: 150.sp,
              color: const Color(0xffE6F1FF),
            ),
            children: [
              TextSpan(
                text: 'Codeswot',
                style: TextStyle(
                  fontSize: 200.sp,
                  color: const Color(0xff64FFDA),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

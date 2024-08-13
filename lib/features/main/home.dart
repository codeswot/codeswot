import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:web_smooth_scroll/web_smooth_scroll.dart';

class HomeMain extends ConsumerStatefulWidget {
  const HomeMain({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _HomeMainState();
}

class _HomeMainState extends ConsumerState<HomeMain> {
  // Controllers
  late ScrollController _scrollController;

  @override
  void initState() {
    // initialize scroll controllers
    _scrollController = ScrollController();

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff0A192F),
      appBar: AppBar(
        leading: Text(
          '{C}',
          style: GoogleFonts.sourceCodePro(
            fontSize: 50.sp,
            color: Colors.white,
          ),
        ),
        backgroundColor: Color(0xff353353),
      ),
      body: SingleChildScrollView(
        controller: _scrollController,
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 32.w),
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
            
              Container(height: 500.h),
              Container(height: 500.h),
              Container(height: 500.h),
            ],
          ),
        ),
      ),
    );
  }
}

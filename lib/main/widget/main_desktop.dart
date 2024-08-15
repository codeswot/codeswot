import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:url_launcher/url_launcher.dart';

class MainPageLgMd extends StatefulWidget {
  const MainPageLgMd({
    super.key,
  });

  @override
  State<MainPageLgMd> createState() => _MainPageLgMdState();
}

class _MainPageLgMdState extends State<MainPageLgMd> {
  final PageController _pageController = PageController(
    initialPage: 0,
    viewportFraction: 1,
  );
  @override
  Widget build(BuildContext context) {
    return Positioned.fill(
      child: Center(
        child: PageView(
          scrollDirection: Axis.vertical,
          controller: _pageController,
          children: [
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    'HE:LLO World! 👋🏾',
                    style: GoogleFonts.nunito(
                      fontSize: 80.sp,
                      color: Colors.white,
                    ),
                  ),
                  SizedBox(height: 50.w),
                  IconButton.filledTonal(
                    iconSize: 70.w,
                    onPressed: () {
                      _pageController.nextPage(
                        duration: const Duration(seconds: 1),
                        curve: Curves.easeIn,
                      );
                    },
                    icon: const Icon(Icons.arrow_downward_rounded),
                  ),
                ],
              ),
            ),
            Center(
              child: RichText(
                text: TextSpan(
                  text: 'I, am ',
                  style: GoogleFonts.nunito(
                    fontSize: 80.sp,
                    color: Colors.white,
                  ),
                  children: [
                    TextSpan(
                      text: 'Codeswot',
                      style: GoogleFonts.nunito(
                        fontSize: 90.sp,
                        color: const Color(0xff64FFDA),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

Future<void> startLaunchUrl(String uri) async {
  final url = Uri.parse(uri);
  if (!await launchUrl(url)) {
    throw Exception('Could not launch $url');
  }
}

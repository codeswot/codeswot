import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/svg.dart';

import 'dart:ui';

import 'package:google_fonts/google_fonts.dart';
import 'package:responsive_framework/responsive_framework.dart';
import 'package:url_launcher/url_launcher.dart';

class HomeMain extends ConsumerStatefulWidget {
  const HomeMain({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _HomeMainState();
}

class _HomeMainState extends ConsumerState<HomeMain> {
  // Controllers

  @override
  void initState() {
    // initialize scroll controllers

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color(0xff0A192F),
        appBar: const CodeswotAppBar(),
        body: ResponsiveBreakpoints.of(context).isDesktop
            ? const Stack(
                children: [
                  MainPageLgMd(),
                  EmailLgMd(),
                  BottomAnchorStyleLgMd(),
                  BottomSocialLgMd(),
                ],
              )
            : Center(
                child: Text(
                  'Mobile view under {C}onstruction 👷🏾‍♂️',
                  style: GoogleFonts.nunito(
                    color: Colors.white,
                    fontSize: 100.sp,
                  ),
                ),
              ),
        floatingActionButton: FloatingActionButton(
          backgroundColor: const Color(0xff353353),
          foregroundColor: Colors.white,
          onPressed: () {},
          child: const Icon(Icons.chat_bubble_outline),
        ));
  }
}

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
                      fontSize: 150.sp,
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
                    fontSize: 150.sp,
                    color: Colors.white,
                  ),
                  children: [
                    TextSpan(
                      text: 'Codeswot',
                      style: GoogleFonts.nunito(
                        fontSize: 150.sp,
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

class BottomSocialLgMd extends StatelessWidget {
  const BottomSocialLgMd({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Positioned(
      bottom: -20.h,
      left: -10.w,
      child: Stack(
        children: [
          SvgPicture.asset(
            'icons/svg/hash_tag.svg',
          ),
          const LinkedCirclesColumn(),
        ],
      ),
    );
  }
}

class BottomAnchorStyleLgMd extends StatelessWidget {
  const BottomAnchorStyleLgMd({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Positioned(
      bottom: 0,
      right: 0,
      child: SvgPicture.asset(
        'icons/svg/bottom_arrow.svg',
        width: 140.w,
        color: const Color(0xff64FFDA).withOpacity(0.4),
      ),
    );
  }
}

class EmailLgMd extends StatelessWidget {
  const EmailLgMd({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.topRight,
      child: Padding(
        padding: EdgeInsets.only(top: 20.w, right: 10.w),
        child: Stack(
          children: [
            Align(
              alignment: Alignment.topRight,
              child: SvgPicture.asset(
                width: 200.w,
                'icons/svg/plane.svg',
                semanticsLabel: 'Paper plane icon',
              ),
            ),
            Positioned(
              right: 20.w,
              child: RotatedBox(
                quarterTurns: 1,
                child: InkWell(
                  onTap: () => _launchUrl('mailto:mubarak@codeswot.dev'),
                  onLongPress: () {
                    Clipboard.setData(const ClipboardData(text: 'mubarak@codeswot.dev')).then((_) {
                      // Optional: Show a confirmation message
                      // ignore: use_build_context_synchronously
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                            content: Text(
                          'Copied to clipboard',
                          style: GoogleFonts.nunito(
                            fontSize: 80.sp,
                          ),
                        )),
                      );
                    });
                  },
                  borderRadius: BorderRadius.circular(4.r),
                  child: Padding(
                    padding: EdgeInsets.all(2.sp),
                    child: Text(
                      'mubarak@codeswot.dev',
                      style: TextStyle(
                        fontSize: 20.sp,
                        color: const Color(0xffE6F1FF).withOpacity(0.5),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class CodeswotAppBar extends StatelessWidget implements PreferredSizeWidget {
  const CodeswotAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return ClipRect(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10.0, sigmaY: 10.0),
        child: Container(
          color: const Color(0xff0A192F).withOpacity(0.5),
          height: preferredSize.height,
          width: preferredSize.width,
          child: Container(
            decoration: BoxDecoration(
              color: const Color(0xff353353).withOpacity(0.2),
            ),
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.w),
              child: const Row(
                children: [
                  CodeSwotLogo(),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  Size get preferredSize => Size(1.sw, 80.w);
}

class CodeSwotLogo extends StatelessWidget {
  const CodeSwotLogo({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return RichText(
      text: TextSpan(
        text: '{C}',
        style: GoogleFonts.sourceCodePro(
          color: const Color(0xff64FFDA),
          fontSize: 30.sp,
          fontWeight: FontWeight.bold,
        ),
        children: [
          TextSpan(
            text: 'odeswot',
            style: GoogleFonts.nunito(
              color: const Color(0xffE6F1FF),
              fontSize: 28.sp,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}

class LinkedCirclesColumn extends StatelessWidget {
  const LinkedCirclesColumn({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(left: 50.w),
      child: SizedBox(
        width: 100.w,
        height: 300.w,
        child: Stack(
          children: [
            Align(
              child: SizedBox(
                height: 200.w,
                child: VerticalDivider(
                  thickness: 0.5.w,
                  color: const Color(0xff64FFDA),
                ),
              ),
            ),
            Align(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  InkWell(
                    borderRadius: BorderRadius.circular(50.r),
                    onTap: () => _launchUrl('https://github.com/codeswot/'),
                    child: CircleAvatar(
                      radius: 30.r,
                      backgroundColor: const Color(0xff64FFDA),
                      child: SvgPicture.asset('icons/svg/github.svg'),
                    ),
                  ),
                  InkWell(
                    borderRadius: BorderRadius.circular(50.r),
                    onTap: () => _launchUrl('https://x.com/codeswot/'),
                    child: CircleAvatar(
                      radius: 30.r,
                      backgroundColor: const Color(0xff64FFDA),
                      child: SvgPicture.asset('icons/svg/tweet.svg'),
                    ),
                  ),
                  InkWell(
                    borderRadius: BorderRadius.circular(50.r),
                    onTap: () => _launchUrl('https://www.linkedin.com/in/codeswot/'),
                    child: CircleAvatar(
                      radius: 30.r,
                      backgroundColor: const Color(0xff64FFDA),
                      child: SvgPicture.asset('icons/svg/link.svg'),
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

Future<void> _launchUrl(String uri) async {
  final url = Uri.parse(uri);
  if (!await launchUrl(url)) {
    throw Exception('Could not launch $url');
  }
}

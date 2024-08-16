import 'package:codeswot/config/theme/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
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
  final List pageImtems = const [
    Hero(),
  ];
  @override
  Widget build(BuildContext context) {
    return Flexible(
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 20.w),
        child: PageView.builder(
          scrollDirection: Axis.vertical,
          controller: _pageController,
          itemCount: pageImtems.length,
          itemBuilder: (context, index) => pageImtems[index],
        ),
      ),
    );
  }
}

class Hero extends ConsumerWidget {
  const Hero({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      margin: EdgeInsets.only(top: 70.w, bottom: 80.w, right: 350.w),
      decoration: BoxDecoration(
        color: AppColors.black.withOpacity(0.8),
        borderRadius: BorderRadius.circular(12.w),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: EdgeInsets.only(left: 20.w),
            width: double.infinity,
            // height: 40.w,
            decoration: BoxDecoration(
              color: AppColors.accent.withOpacity(0.5),
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(12.w),
                topRight: Radius.circular(12.w),
              ),
            ),
            child: Row(
              children: List.generate(
                3,
                (index) => Padding(
                  padding: EdgeInsets.only(
                    right: 8.w,
                    top: 12.w,
                    bottom: 12.w,
                  ),
                  child: TerminalAction(color: _getColorsByIndex(index)),
                ),
              ),
            ),
          ),
          SizedBox(height: 30.w),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 20.w),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SelectableText(
                      '\$: Hi 👋, I am Codeswot\nI Turn code into Stuff,',
                      style: GoogleFonts.sourceCodePro(
                        fontSize: 20.sp,
                        color: Colors.green,
                      ),
                    ),
                    SizedBox(height: 30.w),
                    SelectableText(
                      '| Your Friendly neighbourhood developer! With great power comes great responsibilities. Hard work, studies and constant coding Ihave acquired the awesome power of developing',
                      style: GoogleFonts.nunito(
                        fontSize: 20.sp,
                        color: Colors.green,
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 150.w),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Flexible(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          SelectableText(
                            '\$: “Always believe in you ability to achieve greatness”',
                            style: GoogleFonts.sourceCodePro(
                              fontSize: 18.sp,
                              color: Colors.green,
                            ),
                          ),
                          Text(
                            '__ Mubarak I.',
                            style: GoogleFonts.nunito(
                              fontSize: 15.sp,
                              color: Colors.green,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          )
        ],
      ),
    );
  }

  Color _getColorsByIndex(int index) {
    switch (index) {
      case 0:
        return Colors.red;
      case 1:
        return AppColors.accent;
      case 2:
        return AppColors.primaryColor;

      default:
        return AppColors.accent;
    }
  }
}

class TerminalAction extends StatelessWidget {
  const TerminalAction({this.color, super.key});
  final Color? color;
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 15.w,
      height: 15.w,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: color ?? Colors.red,
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

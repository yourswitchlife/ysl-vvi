import dynamic from 'next/dynamic';
import switchAnimation from '@/assets/switch.json'; // 確保這個路徑是正確的

// 展示用載入元件
export function DefaultLoader({ show = false }) {
  return (
    <div className={`semi-loader ${show ? '' : 'semi-loader--hide'}`}></div>
  );
}

// 展示用載入文字元件
export function LoaderText({ text = 'loading', show = false }) {
  return (
    <div className={`loading-text-bg ${show ? '' : 'loading-text--hide'}`}>
      <div className={`loading-text ${show ? '' : 'loading-text--hide'}`}>
        {text}...
      </div>
    </div>
  );
}

// 禁用SSR
const LottieNoSSR = dynamic(() => import('lottie-react'), {
  ssr: false,
});

// lottie-react
export function CatLoader({ show = false }) {
  return (
    <div className={`cat-loader-bg ${show ? '' : 'cat-loader--hide'}`}>
      <LottieNoSSR
        className={`cat-loader ${show ? '' : 'cat-loader--hide'}`}
        animationData={switchAnimation}
      />
    </div>
  );
}

// export function NikeLoader({ show = false }) {
//   return (
//     <div className={`nike-loader-bg ${show ? '' : 'nike-loader--hide'}`}>
//       <LottieNoSSR
//         className={`nike-loader ${show ? '' : 'nike-loader--hide'}`}
//         animationData={nikeAnimation}
//       />
//     </div>
//   );
// }

export function NoLoader({ show = false }) {
  return <></>;
}

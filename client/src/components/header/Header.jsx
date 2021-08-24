import './header.css';

export default function Header() {
  return (
    <div className='header'>
      <div className='headerTitles'>
        <span className='headerTitleSm'>
          React & Node
        </span>
        <span className='headerTitleLg'>
          Blog
        </span>
      </div>
      <img
        alt='header-pic'
        className='headerImg'
        src='https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png'
      />
    </div>
  );
}

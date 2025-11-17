import { useEffect, useState } from 'react'
import './App.css'

const games = [
  { title: 'Starbound Quest', genre: 'ARPG', status: '上线', statusKey: 'live', summary: '星际探索与动作战斗，穿越未知的裂隙。' },
  { title: 'Echoes of Dawn', genre: '叙事冒险', status: '开发中', statusKey: 'dev', summary: '在日出前找回记忆，选择将改变结局。' },
  { title: 'Circuit Clash', genre: '多人对战', status: '概念阶段', statusKey: 'concept', summary: '高能竞技，策略驱动的团队合作体验。' },
]

function App() {
  const [showWxLogin, setShowWxLogin] = useState(false)
  const appId = import.meta.env.VITE_WECHAT_APPID
  const redirectUri = import.meta.env.VITE_WECHAT_REDIRECT_URI

  const loadWxLoginScript = () => {
    return new Promise((resolve, reject) => {
      if (window.WxLogin) return resolve(undefined)
      const s = document.createElement('script')
      s.src = 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
      s.onload = () => resolve(undefined)
      s.onerror = reject
      document.body.appendChild(s)
    })
  }

  useEffect(() => {
    if (!showWxLogin) return
    ;(async () => {
      try {
        await loadWxLoginScript()
        if (appId && redirectUri && window.WxLogin) {
          new window.WxLogin({
            id: 'wx-login-container',
            appid: appId,
            scope: 'snsapi_login',
            redirect_uri: encodeURIComponent(redirectUri),
            state: 'OdalitaLogin',
            style: '',
            href: ''
          })
        }
      } catch (e) {
        console.error('加载微信登录脚本失败', e)
      }
    })()
  }, [showWxLogin, appId, redirectUri])

  return (
    <div>
      <header className="site-header">
        <nav className="nav container">
          <div className="brand">
            <span className="logo" />
            <span>Odalita Games</span>
          </div>
          <div className="nav-links">
            <a href="#games">作品</a>
            <a href="#about">关于</a>
            <a href="#careers">招聘</a>
            <a href="#news">新闻</a>
            <a href="#contact">联系</a>
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="container wrap">
          <div>
            <h1>打造沉浸世界，激发玩家想象力</h1>
            <p>
              我们专注于创造兼具艺术与可玩性的作品，用技术与叙事连接玩家与宇宙。
            </p>
            <div className="cta">
              <a className="btn btn-primary" href="#games">查看作品</a>
              <a className="btn btn-secondary" href="#careers">加入我们</a>
              <button className="btn btn-wechat" onClick={() => setShowWxLogin(true)}>微信快捷登录</button>
            </div>
          </div>
          <div className="preview">
            <div className="game-card">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h3 style={{margin:0}}>Starbound Quest</h3>
                <span className={`status live`}>上线</span>
              </div>
              <p className="meta">动作角色扮演 / PC & Console</p>
              <p style={{marginTop:8}}>星际探索与动作战斗，穿越未知的裂隙。</p>
            </div>
          </div>
        </div>
      </section>

      {showWxLogin && (
        <div className="wx-modal" role="dialog" aria-modal="true">
          <div className="wx-panel">
            <header>
              <strong>微信登录</strong>
              <button className="btn wx-close" onClick={() => setShowWxLogin(false)}>关闭</button>
            </header>
            <p className="wx-tip">使用微信扫一扫登录本网站。</p>
            {(!appId || !redirectUri) ? (
              <p className="wx-tip">
                未配置 AppID 或回调地址。请在环境变量中设置 `VITE_WECHAT_APPID` 与 `VITE_WECHAT_REDIRECT_URI`，并在微信开放平台配置授权回调域名。
              </p>
            ) : (
              <div id="wx-login-container" style={{ width: '300px', height: '350px', margin: '12px auto' }} />
            )}
          </div>
        </div>
      )}

      <section id="games" className="games container">
        <h2 className="section-title">作品集</h2>
        <p className="section-subtitle">从概念到发行，每一部作品都凝聚热爱与打磨。</p>
        <div className="games-grid">
          {games.map((g) => (
            <div key={g.title} className="game-card">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h3 style={{margin:0}}>{g.title}</h3>
                <span className={`status ${g.statusKey}`}>{g.status}</span>
              </div>
              <p className="meta">{g.genre}</p>
              <p style={{marginTop:8}}>{g.summary}</p>
              <div style={{marginTop:12, display:'flex', gap:10}}>
                <button className="btn btn-secondary">了解更多</button>
                <button className="btn btn-primary">预告片</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">关于工作室</h2>
          <p>
            Odalita Games 成立于 2020 年，核心成员来自国际知名开发团队。我们相信设计、叙事和技术的协同能够带来超越想象的体验。
          </p>
        </div>
      </section>

      <section id="careers" className="section careers">
        <div className="container">
          <h2 className="section-title">加入我们</h2>
          <p className="section-subtitle">远程友好 · 开放协作 · 追求卓越</p>
          <div className="roles">
            <div className="role">
              <h3 style={{marginTop:0}}>资深客户端工程师</h3>
              <p>熟悉引擎与渲染优化，热爱打造丝滑体验。</p>
            </div>
            <div className="role">
              <h3 style={{marginTop:0}}>关卡设计师</h3>
              <p>理解节奏与叙事，为玩家构造难忘旅程。</p>
            </div>
            <div className="role">
              <h3 style={{marginTop:0}}>技术美术</h3>
              <p>连接艺术与技术，让视觉与性能同样出色。</p>
            </div>
          </div>
          <div style={{marginTop:18}}>
            <a className="btn btn-primary" href="#contact">投递简历</a>
          </div>
        </div>
      </section>

      <section id="news" className="section news">
        <div className="container">
          <h2 className="section-title">最新动态</h2>
          <div className="list">
            <div className="news-item">
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <strong>Starbound Quest v1.2 更新上线</strong>
                <span className="date">{new Date().toISOString().slice(0,10)}</span>
              </div>
              <p>性能优化与新支线任务，探索体验更顺滑。</p>
            </div>
            <div className="news-item">
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <strong>Echoes of Dawn 试玩报名开启</strong>
                <span className="date">2025-12-05</span>
              </div>
              <p>邀请玩家参与叙事体验打磨，欢迎提出建议。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="container">
          <h2 className="section-title">联系与社媒</h2>
          <div className="cards">
            <div className="contact-card">
              <strong>商务合作</strong>
              <p>bd@odalita.games</p>
            </div>
            <div className="contact-card">
              <strong>招聘投递</strong>
              <p>jobs@odalita.games</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          © {new Date().getFullYear()} Odalita Games · All Rights Reserved
        </div>
      </footer>
    </div>
  )
}

export default App
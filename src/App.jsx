import React, { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  const [siteData, setSiteData] = useState(null);

  useEffect(() => {
    // 讀取 public 資料夾下的 data.json
    fetch('./data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("找不到 data.json 檔案");
        }
        return response.json();
      })
      .then(data => setSiteData(data))
      .catch(error => console.error("讀取失敗:", error));
  }, []);

  if (!siteData) {
    return <div className="loading">正在載入實驗室教材...</div>;
  }

  return (
    <div className="app-container">
      {/* 頁面標題區 */}
      <header className="site-header">
        <h1 className="site-title">{siteData.siteTitle}</h1>
        <p className="site-desc">{siteData.siteDescription}</p>
      </header>

      {/* 內容區：依照分類顯示 */}
      <main>
        {siteData.sections.map((section, index) => (
          <section key={index} className="category-section">
            <h2 className="category-title">
              <span className="icon">📂</span> {section.title}
            </h2>
            
            <div className="projects-grid">
              {section.items.map((item) => (
                <a 
                  key={item.id} 
                  href={item.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="card"
                >
                  {/* 如果 data.json 有填圖片網址，就顯示圖片，否則顯示預設圖塊 */}
                  <div className="card-image-wrapper">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="card-img" />
                    ) : (
                      <div className="card-img-placeholder">
                        <span>{item.title.charAt(0)}</span>
                      </div>
                    )}
                  </div>

                  <div className="card-content">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-desc">{item.description}</p>
                    <div className="tags">
                      {item.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} 銘鉑科技 Minbold Tech | 尤達數理課程</p>
      </footer>
    </div>
  );
}

export default App;
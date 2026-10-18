FROSTX TRADER — TRADINGVIEW-LIKE CHART BUILD

WHAT IS INCLUDED
- Candlestick chart using Lightweight Charts when the CDN is available, with the project's fallback chart retained.
- Timeframes: 1m, 5m, 15m, 1H, 4H, 1D.
- Zoom/pan, crosshair, watchlist, and price display.
- Drawing tools: horizontal price line, trendline, Fibonacci levels, zone top/bottom levels, entry/target levels, text labels, and time marker (where supported by the chart library). The channel tool currently draws its base line only.
- Indicators: SMA 20, EMA 50, EMA 200, Bollinger Bands, RSI 14, MACD 12/26/9, ADX 14.
- SMC overlay: swing high/low liquidity references, approximate BOS/CHoCH markers, and FVG / order-block reference levels. This is a rule-based approximation, not a guarantee of trade signals.
- Staking screen is UI preview only. It does not receive, lock, or transfer crypto.
- No broker execution or real-money trading is enabled.

MARKET DATA
- Crypto candles and WebSocket updates use Binance public market endpoints for BTC, ETH, SOL, BNB and XRP pairs.
- Forex/metals/oil candles use the server-side Twelve Data proxy for EURUSD, GBPUSD, AUDUSD, XAUUSD, XAGUSD and USOIL.
- Twelve Data is candle-history / on-demand data in this package; this does NOT provide guaranteed tick-by-tick Forex streaming. Symbol access, intervals, quotas, and latency depend on the provider plan.
- If a feed fails, the chart should show no verified candles rather than inventing market candles.

DEPLOY TO VERCEL
1. Extract this ZIP.
2. Create a GitHub repository and upload the CONTENTS of this folder so index.html and vercel.json are at repository root and api/market.js is inside api/.
3. In Vercel, import that GitHub repository and deploy it.
4. In Vercel > Project Settings > Environment Variables, add TWELVEDATA_API_KEY with your own valid Twelve Data API key. Enable it for Production (and Preview if needed), then redeploy.
5. Open the deployed URL. Test BTCUSD first (Binance public feed), then EURUSD and XAUUSD (require the Twelve Data proxy key and provider permissions).

SECURITY
- Keep TWELVEDATA_API_KEY only in Vercel Environment Variables. Do not paste it into index.html, GitHub, or chat.
- If an older key was exposed anywhere, revoke it and generate a new one.

IMPORTANT LIMITATIONS
- This is a TradingView-like charting prototype, not the TradingView platform and not a complete TradingView clone.
- Indicators and SMC calculations are technical-analysis helpers, not financial advice and not guaranteed signals.
- RSI/MACD/ADX are rendered as independently scaled line series within the chart area; they are not yet separate lower indicator panes like TradingView.
- Drawing overlays are functional but intentionally simpler than TradingView's full drawing system; drawings are not synced across devices and may reset when the symbol/timeframe changes.
- Authentication requires valid Supabase settings in index.html; the current placeholder settings must be replaced before login/database features can work.
- This package does not configure payments, broker execution, alerts delivery services, or actual staking.

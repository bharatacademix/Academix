# Google AdSense Setup Guide

## ✅ Setup Complete!

Your Google AdSense has been integrated into the application. Here's what was added:

### 1. **Main AdSense Script** (`index.html`)
- Added the Google AdSense tracking script in the `<head>` section
- Publisher ID: `ca-pub-9096209867795576`
- Script runs async to not block page load

### 2. **Reusable AdSense Component** (`src/components/shared/AdSense.tsx`)
- React component for easy ad placement throughout your app
- Supports multiple ad formats
- Handles TypeScript types properly

## How to Use

### Basic Implementation

```typescript
import { AdSense } from '@/components/shared/AdSense';

// In your component:
<AdSense 
  adSlot="YOUR_AD_UNIT_ID"
  adFormat="auto"
  fullWidth={true}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `adSlot` | string | required | Your Google AdSense Ad Unit ID |
| `adFormat` | 'auto' \| 'horizontal' \| 'vertical' \| 'rectangle' | 'auto' | Ad format type |
| `fullWidth` | boolean | true | Enable responsive ads |
| `style` | React.CSSProperties | - | Custom CSS styles |
| `className` | string | '' | CSS class for styling |

## Creating Ad Units in Google AdSense

1. Go to [Google AdSense Dashboard](https://adsense.google.com)
2. Navigate to **Ads > By code**
3. Click **Create new ad unit**
4. Choose ad format and size
5. Copy the **Ad unit ID** (format: `123456789`)
6. Use the ID in your components

## Placement Examples

### 1. **Top of Page Banner** (in `src/components/layout/TopBar.tsx`)
```typescript
import { AdSense } from '@/components/shared/AdSense';

export const TopBar = () => {
  return (
    <div>
      {/* Your existing TopBar content */}
      <AdSense 
        adSlot="YOUR_TOP_AD_UNIT_ID"
        adFormat="horizontal"
        style={{ marginBottom: '20px' }}
      />
    </div>
  );
};
```

### 2. **Sidebar Ad** (create in your layout)
```typescript
<AdSense 
  adSlot="YOUR_SIDEBAR_AD_UNIT_ID"
  adFormat="vertical"
  style={{ width: '300px', marginLeft: '20px' }}
/>
```

### 3. **Between Sections** (in page components)
```typescript
<div className="content-section">
  {/* Your content */}
</div>
<AdSense 
  adSlot="YOUR_BETWEEN_SECTION_AD_UNIT_ID"
  adFormat="horizontal"
  className="ad-spacing"
/>
<div className="content-section">
  {/* More content */}
</div>
```

### 4. **In-Article Ad** (between paragraphs)
```typescript
<article>
  <p>Article content...</p>
  <AdSense 
    adSlot="YOUR_IN_ARTICLE_AD_UNIT_ID"
    adFormat="auto"
  />
  <p>More article content...</p>
</article>
```

## Recommended Placements for Your Site

### HomePage.tsx
- Header banner (horizontal)
- Between service sections

### ServicesPage.tsx
- Sidebar (vertical)
- Between service details

### PricingPage.tsx
- Top of pricing table
- After pricing comparison

### TestimonialsPage.tsx
- Between testimonial sections

### BlogPages (if added)
- In-article ads
- Between paragraphs

## CSS Styling Example

```css
/* Add to your CSS file */
.ad-container {
  margin: 20px 0;
  padding: 10px;
  border-radius: 8px;
  background-color: #f5f5f5;
}

/* For responsive behavior */
@media (max-width: 768px) {
  .ad-container {
    margin: 15px 0;
  }
}
```

## Important Notes

⚠️ **Before deploying to production:**

1. **Verify Account Status**
   - Make sure your AdSense account is fully approved
   - Check your account settings in Google AdSense dashboard

2. **Ad Unit IDs**
   - Each placement should ideally have its own ad unit ID
   - Different ad units = better tracking and optimization

3. **Ad Policies**
   - Don't click your own ads
   - Don't encourage users to click ads
   - Follow Google AdSense policies to avoid account suspension

4. **Testing**
   - Use `ca-pub-0000000000000000` for testing (will show PSAs)
   - Never test with real ad unit IDs
   - Your real ad unit IDs should only be used in production

5. **Performance**
   - Ads load async, so they won't slow down your page
   - Each AdSense component will trigger one ad request
   - Monitor Core Web Vitals after adding ads

## Deployment Checklist

- [ ] Replace all test ad unit IDs with real ones
- [ ] Test ads appear correctly on desktop and mobile
- [ ] Verify no console errors related to AdSense
- [ ] Check Google AdSense dashboard after deployment
- [ ] Monitor earnings and ad performance
- [ ] Ensure compliance with AdSense policies

## Troubleshooting

### Ads not showing?
1. Check if Publisher ID is correct
2. Verify ad unit IDs are valid
3. Check browser console for errors
4. Ensure AdSense account is approved
5. Wait 24-48 hours for ads to populate

### "Blank space" appearing?
- This is normal, ads take time to load
- Google may not always have relevant ads

### Low earnings?
- Increase ad placements
- Optimize ad formats for your layout
- Improve site traffic
- Focus on high-traffic pages

## References

- [Google AdSense Setup Guide](https://support.google.com/adsense/answer/10173539)
- [AdSense Policies](https://support.google.com/adsense/answer/48182)
- [Code Implementation](https://support.google.com/adsense/answer/9274012)

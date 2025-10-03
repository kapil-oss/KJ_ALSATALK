# Model and Token Limit Updates

## Changes Made

### 1. ✅ Updated OpenAI Realtime Models List

Updated the default realtime models to include all currently available OpenAI realtime models:

**Previous Models:**
- gpt-realtime
- gpt-4o-realtime-preview
- gpt-4o-realtime-preview-2024-12-17

**New Models (Complete List):**
- gpt-4o-realtime-preview
- gpt-4o-realtime-preview-2024-10-01
- gpt-4o-realtime-preview-2024-12-17
- gpt-4o-mini-realtime-preview
- gpt-4o-mini-realtime-preview-2024-12-17

**Note:** The list now includes both **gpt-4o** and **gpt-4o-mini** variants:
- **gpt-4o-realtime-preview**: Full capability model
- **gpt-4o-mini-realtime-preview**: Cost-effective, faster alternative

### 2. ✅ Changed Default Token Limit to 500

**Previous Default:** 1,000,000 tokens (1M)
**New Default:** 500 tokens

This change applies to:
- New user registrations
- Admin-created users
- Default form values in admin panel

### Files Modified

#### 1. [services/openaiService.js](services/openaiService.js)
```javascript
const DEFAULT_REALTIME_MODELS = [
    'gpt-4o-realtime-preview',
    'gpt-4o-realtime-preview-2024-10-01',
    'gpt-4o-realtime-preview-2024-12-17',
    'gpt-4o-mini-realtime-preview',
    'gpt-4o-mini-realtime-preview-2024-12-17'
];
```

#### 2. [database/complete_schema.sql](database/complete_schema.sql)
```sql
token_limit INTEGER DEFAULT 500, -- 500 tokens default
```

#### 3. [database/schema.sql](database/schema.sql)
```sql
token_limit INTEGER DEFAULT 500,
```

#### 4. [public/admin.html](public/admin.html)
- Updated default value in token limit input field: `value="500"`
- Updated fallback values in JavaScript: `|| 500`
- Updated display in modal: `<span id="tokensLimit">500</span>`

## Impact

### For New Users
- All new users will be created with a **500 token limit** by default
- Admins can still manually adjust limits when creating/editing users

### For Existing Users
- **No change** - existing users keep their current token limits
- Admins can update limits individually through the admin panel

### For Model Selection
- Admin panel now shows **5 realtime models** in quick select
- Includes both full and mini variants for flexibility
- Auto-refreshes from OpenAI API when available

## Model Comparison

| Model | Type | Best For |
|-------|------|----------|
| gpt-4o-realtime-preview-2024-12-17 | Full | Latest features, highest quality |
| gpt-4o-realtime-preview-2024-10-01 | Full | Stable, production-ready |
| gpt-4o-realtime-preview | Full | General purpose |
| gpt-4o-mini-realtime-preview-2024-12-17 | Mini | Latest mini, cost-effective |
| gpt-4o-mini-realtime-preview | Mini | Fast, economical |

## Token Usage Recommendations

With the new 500 token default:
- **Tight budget**: Use gpt-4o-mini models (faster, cheaper)
- **Quality critical**: Use gpt-4o models
- **Testing/Development**: Start with 500, increase as needed
- **Production**: Admins can increase limits based on usage

## Migration Notes

**For existing databases:**
- The schema change only affects NEW users
- To update existing users to 500 tokens, run:
```sql
UPDATE users SET token_limit = 500 WHERE token_limit = 1000000;
```

**Warning:** Only run the above if you want to reset all users to 500 tokens!

## Testing

After these changes:
1. ✅ Create a new user - should have 500 token limit
2. ✅ Check admin panel - default should be 500
3. ✅ Refresh models in admin panel - should show 5 models
4. ✅ Existing users - should keep their current limits

## Future Considerations

- Consider adding token usage alerts at 80% usage
- Implement automatic token limit increases for trusted users
- Add model performance metrics for comparison
- Create user tiers with different default limits

---

**Last Updated:** 2025-10-02
**Updated By:** Claude Code

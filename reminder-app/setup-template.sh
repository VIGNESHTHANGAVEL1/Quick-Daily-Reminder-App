#!/bin/bash

# Full-Stack Project Template Setup Script
# This script helps you customize this template for your new project

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     Full-Stack Project Template Setup                     ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if template.config.json exists
if [ ! -f "template.config.json" ]; then
    echo "❌ Error: template.config.json not found!"
    echo "Please ensure you're running this script from the project root."
    exit 1
fi

# Function to prompt for input with default value
prompt_with_default() {
    local prompt_text=$1
    local default_value=$2
    local var_name=$3
    
    read -p "$prompt_text [$default_value]: " input
    eval "$var_name=\"\${input:-$default_value}\""
}

# Function to replace strings in files
replace_in_file() {
    local file=$1
    local search=$2
    local replace=$3
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|${search}|${replace}|g" "$file"
    else
        # Linux
        sed -i "s|${search}|${replace}|g" "$file"
    fi
}

echo "📝 Let's customize your project!"
echo ""

# Get project information
prompt_with_default "Project Name (lowercase, no spaces, e.g., 'myapp')" "reminder-app" PROJECT_NAME
prompt_with_default "Project Display Name (e.g., 'My Awesome App')" "Daily Reminder App" PROJECT_DISPLAY_NAME
prompt_with_default "Project Description" "A full-stack daily reminder application" PROJECT_DESCRIPTION
prompt_with_default "Author Name" "Your Name" AUTHOR_NAME
prompt_with_default "Author Email" "your.email@example.com" AUTHOR_EMAIL

echo ""
echo "🔧 Backend Configuration"
prompt_with_default "Backend Port" "5001" BACKEND_PORT
prompt_with_default "Database Name" "reminderdb" DATABASE_NAME

echo ""
echo "📱 Mobile App Configuration"
prompt_with_default "Package Name (e.g., 'myapp' for com.myapp)" "reminderapp" PACKAGE_NAME
prompt_with_default "App Name (no spaces, e.g., 'MyApp')" "ReminderApp" APP_NAME
prompt_with_default "App Display Name (shown to users)" "Reminder App" APP_DISPLAY_NAME

echo ""
echo "🗄️  API Configuration"
prompt_with_default "Model Name (singular, e.g., 'Reminder')" "Reminder" MODEL_NAME
prompt_with_default "Route Prefix (plural, e.g., 'reminders')" "reminders" ROUTE_PREFIX

# Convert MODEL_NAME to lowercase plural for some replacements
MODEL_NAME_LOWER=$(echo "$MODEL_NAME" | tr '[:upper:]' '[:lower:]')
MODEL_NAME_PLURAL="${MODEL_NAME_LOWER}s"

echo ""
echo "🔄 Starting replacements..."
echo ""

# Update template.config.json
echo "📄 Updating template.config.json..."
replace_in_file "template.config.json" "reminder-app" "$PROJECT_NAME"
replace_in_file "template.config.json" "Daily Reminder App" "$PROJECT_DISPLAY_NAME"
replace_in_file "template.config.json" "A full-stack daily reminder application" "$PROJECT_DESCRIPTION"
replace_in_file "template.config.json" "Your Name" "$AUTHOR_NAME"
replace_in_file "template.config.json" "your.email@example.com" "$AUTHOR_EMAIL"
replace_in_file "template.config.json" "5001" "$BACKEND_PORT"
replace_in_file "template.config.json" "reminderdb" "$DATABASE_NAME"
replace_in_file "template.config.json" "reminderapp" "$PACKAGE_NAME"
replace_in_file "template.config.json" "ReminderApp" "$APP_NAME"
replace_in_file "template.config.json" "Reminder App" "$APP_DISPLAY_NAME"
replace_in_file "template.config.json" "Reminder" "$MODEL_NAME"
replace_in_file "template.config.json" "\"reminders\"" "\"$ROUTE_PREFIX\""

# Update backend files
echo "🔙 Updating backend files..."
if [ -f "backend/package.json" ]; then
    replace_in_file "backend/package.json" "reminder-app-backend" "${PROJECT_NAME}-backend"
    replace_in_file "backend/package.json" "Daily Reminder App Backend" "${PROJECT_DISPLAY_NAME} Backend"
fi

if [ -f "backend/.env.example" ]; then
    replace_in_file "backend/.env.example" "5001" "$BACKEND_PORT"
    replace_in_file "backend/.env.example" "reminderdb" "$DATABASE_NAME"
fi

# Update web files
echo "🌐 Updating web files..."
if [ -f "web/package.json" ]; then
    replace_in_file "web/package.json" "reminder-app-web" "${PROJECT_NAME}-web"
fi

if [ -f "web/index.html" ]; then
    replace_in_file "web/index.html" "Daily Reminder App" "$PROJECT_DISPLAY_NAME"
fi

# Update mobile files
echo "📱 Updating mobile files..."
if [ -f "mobile/package.json" ]; then
    replace_in_file "mobile/package.json" "reminder-app-mobile" "${PROJECT_NAME}-mobile"
fi

if [ -f "mobile/index.js" ]; then
    replace_in_file "mobile/index.js" "ReminderApp" "$APP_NAME"
fi

# Update Android files
if [ -f "mobile/android/app/build.gradle" ]; then
    replace_in_file "mobile/android/app/build.gradle" "com.reminderapp" "com.$PACKAGE_NAME"
fi

if [ -f "mobile/android/settings.gradle" ]; then
    replace_in_file "mobile/android/settings.gradle" "ReminderApp" "$APP_NAME"
fi

if [ -f "mobile/android/app/src/main/res/values/strings.xml" ]; then
    replace_in_file "mobile/android/app/src/main/res/values/strings.xml" "Reminder App" "$APP_DISPLAY_NAME"
fi

# Update iOS files (if they exist)
if [ -f "mobile/ios/TempReminderApp/Info.plist" ]; then
    replace_in_file "mobile/ios/TempReminderApp/Info.plist" "TempReminderApp" "$APP_NAME"
fi

# Update model files
echo "📦 Updating model files..."
find backend/src/models -name "*.js" -type f 2>/dev/null | while read file; do
    if [ -f "$file" ]; then
        replace_in_file "$file" "Reminder" "$MODEL_NAME"
        replace_in_file "$file" "reminder" "$MODEL_NAME_LOWER"
    fi
done

# Update route files
find backend/src/routes -name "*.js" -type f 2>/dev/null | while read file; do
    if [ -f "$file" ]; then
        replace_in_file "$file" "/reminders" "/$ROUTE_PREFIX"
        replace_in_file "$file" "Reminder" "$MODEL_NAME"
        replace_in_file "$file" "reminder" "$MODEL_NAME_LOWER"
    fi
done

# Update README
if [ -f "README.md" ]; then
    echo "📚 Updating README.md..."
    replace_in_file "README.md" "Daily Reminder App" "$PROJECT_DISPLAY_NAME"
    replace_in_file "README.md" "reminder-app" "$PROJECT_NAME"
fi

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "📋 Next steps:"
echo "  1. Review and update template.config.json if needed"
echo "  2. Update Android package names in:"
echo "     - mobile/android/app/build.gradle"
echo "     - mobile/android/app/src/main/java/com/$PACKAGE_NAME/"
echo "  3. Update iOS bundle ID in Xcode project"
echo "  4. Run: cd backend && npm install"
echo "  5. Run: cd web && npm install"
echo "  6. Run: cd mobile && npm install --legacy-peer-deps"
echo "  7. For iOS: cd mobile/ios && pod install"
echo ""
echo "🎉 Your project template is ready!"
echo ""


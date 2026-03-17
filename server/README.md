server/
├── .env                # Environment variables (PORT, DB_URI, JWT_SECRET)
├── .gitignore          # Files to ignore for git
├── package.json        # Dependencies and scripts
├── server.js           # Entry point of the application
│
├── config/             # Database connection and configuration
│   └── db.js           # MongoDB connection logic
│
├── models/             # Mongoose Schemas (Database structure)
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   ├── Cart.js
│   └── Category.js
│
├── routes/             # API Route definitions
│   ├── authRoutes.js   # Login, Register
│   ├── productRoutes.js# CRUD for products
│   ├── userRoutes.js   # User profile, updates
│   ├── orderRoutes.js  # Checkout, order history
│   └── cartRoutes.js   # Add to cart, remove
│
├── controllers/        # Business Logic (handles requests)
│   ├── authController.js
│   ├── productController.js
│   ├── userController.js
│   ├── orderController.js
│   └── cartController.js
│
├── middlewares/        # Custom Express middlewares
│   ├── authMiddleware.js    # Protect routes (JWT verification)
│   ├── adminMiddleware.js   # Restrict access to admins
│   └── errorMiddleware.js   # Global error handler
│
├── utils/              # Helper functions
│   ├── generateToken.js     # JWT generation
│   └── asyncHandler.js      # Try-catch wrapper for async functions
│
└── uploads/            # Folder to store product images locally (if not using Cloudinary/S3)
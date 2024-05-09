// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsModule } from './modules/comments/comments.module';
import { VideosModule } from './modules/videos/videos.module';
import { RatingsModule } from './modules/ratings/ratings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This makes ConfigModule globally available throughout the application
      envFilePath: `.env`, // Specify the path to your .env file
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Get the URI from .env file
        useNewUrlParser: true,
        useUnifiedTopology: true,
      
      connectionFactory: (connection) => {
        console.log('Connected to MongoDB at:', connection.host ,connection.port, connection.name);
        return connection;
      },
    }),
      inject: [ConfigService],
    }),
    CommentsModule,
    VideosModule,
    RatingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

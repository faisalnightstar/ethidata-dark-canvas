import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Job } from '../models/Job.js';
import { BlogPost } from '../models/BlogPost.js';
import { Event } from '../models/Event.js';
import { Resource } from '../models/Resource.js';

// Load environment variables from correct path (root of repo)
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ethidata';

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('📦 Connected to MongoDB');

        // Clear existing data
        await Job.deleteMany({});
        await BlogPost.deleteMany({});
        await Event.deleteMany({});
        await Resource.deleteMany({});
        console.log('🧹 Cleared existing data');

        // Create Jobs
        const jobs = await Job.create([
            {
                title: 'Senior Frontend Engineer',
                slug: 'senior-frontend-engineer',
                department: 'Engineering',
                location: 'Remote',
                type: 'Full-time',
                description: 'We are looking for an experienced Frontend Engineer to join our team.',
                requirements: ['5+ years of experience with React', 'Experience with TypeScript', 'Strong understanding of web performance'],
                responsibilities: ['Build and maintain user interfaces', 'Collaborate with designers and product managers', 'Mentor junior developers'],
                salary: { min: 120000, max: 160000, currency: 'USD' },
                isActive: true
            },
            {
                title: 'Product Designer',
                slug: 'product-designer',
                department: 'Design',
                location: 'New York, NY',
                type: 'Full-time',
                description: 'Join our design team to create beautiful and intuitive user experiences.',
                requirements: ['3+ years of product design experience', 'Proficiency in Figma', 'Strong portfolio'],
                responsibilities: ['Design user flows and interfaces', 'Conduct user research', 'Work with engineers to implement designs'],
                salary: { min: 100000, max: 140000, currency: 'USD' },
                isActive: true
            },
            {
                title: 'Marketing Manager',
                slug: 'marketing-manager',
                department: 'Marketing',
                location: 'London, UK',
                type: 'Contract',
                description: 'Lead our marketing initiatives and grow our brand presence.',
                requirements: ['Experience in B2B marketing', 'Strong communication skills', 'Data-driven mindset'],
                responsibilities: ['Develop marketing strategies', 'Manage social media channels', 'Analyze campaign performance'],
                salary: { min: 80000, max: 100000, currency: 'GBP' },
                isActive: true
            }
        ]);
        console.log(`✅ Created ${jobs.length} jobs`);

        // Create Blog Posts
        const blogPosts = await BlogPost.create([
            {
                title: 'The Future of Web Development',
                slug: 'future-of-web-development',
                excerpt: 'Exploring the latest trends and technologies shaping the web.',
                content: '# The Future of Web Development\n\nWeb development is constantly evolving...',
                author: { name: 'Faisal', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Faisal' },
                category: 'Technology',
                tags: ['Web Dev', 'Trends', 'Future'],
                coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                isPublished: true,
                publishedAt: new Date(),
                viewCount: 150
            },
            {
                title: 'Designing for Accessibility',
                slug: 'designing-for-accessibility',
                excerpt: 'How to create inclusive digital experiences for everyone.',
                content: '# Designing for Accessibility\n\nAccessibility is not just a feature...',
                author: { name: 'Sarah', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
                category: 'Design',
                tags: ['Accessibility', 'Inclusive Design', 'UX'],
                coverImage: 'https://images.unsplash.com/photo-1573164713988-8665fc963095',
                isPublished: true,
                publishedAt: new Date(),
                viewCount: 89
            }
        ]);
        console.log(`✅ Created ${blogPosts.length} blog posts`);

        // Create Events
        const events = await Event.create([
            {
                title: 'Ethidata Tech Summit 2024',
                slug: 'ethidata-tech-summit-2024',
                description: 'Annual technology conference bringing together industry leaders.',
                type: 'conference',
                date: new Date('2024-11-15'),
                time: '09:00 AM',
                duration: '8 hours',
                speakers: [
                    { name: 'John Doe', role: 'CTO, TechCorp', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
                    { name: 'Jane Smith', role: 'Product Lead, Innovate', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' }
                ],
                registrationUrl: 'https://example.com/register',
                maxAttendees: 500,
                currentAttendees: 150,
                isActive: true
            },
            {
                title: 'Web Performance Workshop',
                slug: 'web-performance-workshop',
                description: 'Hands-on workshop on optimizing web application performance.',
                type: 'workshop',
                date: new Date('2024-05-20'),
                time: '02:00 PM',
                duration: '3 hours',
                speakers: [
                    { name: 'Alice Johnson', role: 'Senior Engineer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' }
                ],
                maxAttendees: 50,
                currentAttendees: 45,
                isActive: true
            }
        ]);
        console.log(`✅ Created ${events.length} events`);

        // Create Resources
        const resources = await Resource.create([
            {
                title: 'The Ultimate Guide to React Performance',
                slug: 'react-performance-guide',
                description: 'A comprehensive guide to optimizing React applications.',
                type: 'ebook',
                fileUrl: 'https://example.com/guide.pdf',
                thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
                isGated: true,
                downloadCount: 1200
            },
            {
                title: 'Component Library Template',
                slug: 'component-library-template',
                description: 'A starter template for building your own component library.',
                type: 'template',
                fileUrl: 'https://example.com/template.zip',
                isGated: false,
                downloadCount: 500
            }
        ]);
        console.log(`✅ Created ${resources.length} resources`);

        console.log('✨ Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();

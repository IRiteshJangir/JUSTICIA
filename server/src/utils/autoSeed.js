const User = require('../models/User');
const PracticeArea = require('../models/PracticeArea');
const CaseStudy = require('../models/CaseStudy');
const Blog = require('../models/Blog');
const BlogCategory = require('../models/BlogCategory');
const FAQ = require('../models/FAQ');
const Testimonial = require('../models/Testimonial');
const TeamMember = require('../models/TeamMember');
const WebsiteSetting = require('../models/WebsiteSetting');

const autoSeed = async () => {
  try {
    // 1. Ensure Admin User
    let admin = await User.findOne({ email: 'admin@justicia.com' });
    if (!admin) {
      admin = await User.create({
        name: 'Admin',
        email: 'admin@justicia.com',
        password: 'Admin@123',
        role: 'admin',
      });
      console.log('✅ Auto-seed: Default admin created (admin@justicia.com / Admin@123)');
    }

    // 2. Check if data exists
    const practiceAreaCount = await PracticeArea.countDocuments();
    if (practiceAreaCount > 0) {
      return; // Data already exists, skip
    }

    console.log('🌱 Empty database detected. Auto-seeding initial data...');

    // Seed Practice Areas
    const practiceAreas = await PracticeArea.insertMany([
      { title: 'Criminal Law', shortDescription: 'Defending your rights in criminal matters with strategic courtroom advocacy.', description: 'Our criminal law team provides expert defense and representation in all types of criminal cases, from minor offenses to serious charges. We ensure your constitutional rights are vigorously protected at every stage of the legal process.', icon: 'gavel', order: 1, isPublished: true },
      { title: 'Family Law', shortDescription: 'Handling divorce, child custody, maintenance & family settlements with compassion.', description: 'We handle all family law matters with sensitivity and professionalism, including divorce proceedings, child custody battles, alimony disputes, domestic violence cases, and adoption procedures.', icon: 'users', order: 2, isPublished: true },
      { title: 'Civil Law', shortDescription: 'Strategic dispute resolution, civil litigation & commercial litigation services.', description: 'Our civil litigation team handles property disputes, contractual disagreements, tort claims, injunctions, and all types of civil suits with strategic approach and thorough preparation.', icon: 'scale', order: 3, isPublished: true },
      { title: 'Property Law', shortDescription: 'Title verification, property disputes, agreements & land registry litigation.', description: 'We provide comprehensive legal services for real estate transactions, property disputes, title verification, land acquisition matters, tenancy issues, and construction-related legal matters.', icon: 'home', order: 4, isPublished: true },
      { title: 'Corporate Law', shortDescription: 'Business incorporation, mergers, commercial contracts & statutory compliance.', description: 'Our corporate law practice covers company incorporation, mergers and acquisitions, shareholder agreements, compliance advisory, corporate governance, and commercial contract drafting and review.', icon: 'building', order: 5, isPublished: true },
      { title: 'Tax & GST', shortDescription: 'Direct & indirect taxation, GST compliance, appeals & tribunal litigation.', description: 'We provide expert guidance on direct and indirect taxation, GST registration and compliance, tax planning, assessment proceedings, appeals, and representation before tax tribunals.', icon: 'receipt', order: 6, isPublished: true },
      { title: 'Consumer Law', shortDescription: 'Protecting consumer rights against deficient services & unfair trade practices.', description: 'We represent consumers in complaints against defective products, deficient services, unfair trade practices, and misleading advertisements before consumer forums and commissions.', icon: 'shield', order: 7, isPublished: true },
      { title: 'Cyber Law', shortDescription: 'Cybercrime defense, data privacy compliance & IT Act litigation.', description: 'Our cyber law experts handle cases related to data breaches, online fraud, cyberbullying, identity theft, IT Act compliance, and digital evidence. We also advise on data privacy regulations.', icon: 'monitor', order: 8, isPublished: true },
      { title: 'Labour Law', shortDescription: 'Employment contracts, workplace disputes & industrial tribunal representation.', description: 'We provide legal assistance for employment contracts, workplace harassment, wrongful termination, wage disputes, labour compliance, and representation before labour courts and tribunals.', icon: 'hard-hat', order: 9, isPublished: true }
    ]);

    // Seed Blog Categories
    const blogCategories = await BlogCategory.insertMany([
      { name: 'Criminal Law', description: 'Articles about criminal law and procedures.' },
      { name: 'Corporate Law', description: 'Business and corporate legal insights.' },
      { name: 'Property Law', description: 'Real estate and property legal updates.' },
      { name: 'Family Law', description: 'Articles on family and matrimonial law.' },
      { name: 'Legal Updates', description: 'Latest legal news and amendments.' }
    ]);

    // Seed Case Studies
    await CaseStudy.insertMany([
      { 
        title: 'High Court Acquittal in Murder Case', 
        description: 'Successfully defended client against murder charges with insufficient evidence.', 
        content: '<p>Our criminal law team represented a client who was wrongfully accused of murder. Through meticulous investigation, cross-examination of witnesses, and presentation of alibi evidence, we secured a complete acquittal from the High Court.</p><p><strong>Outcome:</strong> Client acquitted of all charges with immediate release.</p><p><em>Note: This is a fictional sample case study for demonstration purposes.</em></p>', 
        category: 'Criminal Law', 
        outcome: 'Client Acquitted', 
        featuredImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        practiceArea: practiceAreas[0]._id, 
        isPublished: true 
      },
      { 
        title: 'Property Dispute Won After 5-Year Battle', 
        description: 'Resolved a complex ancestral property dispute involving multiple parties.', 
        content: '<p>A family approached us regarding a disputed ancestral property worth several crores. After thorough title search, document verification, and strategic litigation over 5 years, we secured a favorable judgment restoring full ownership rights to our client.</p><p><strong>Outcome:</strong> Complete restoration of ownership rights with mesne profits.</p><p><em>Note: This is a fictional sample case study.</em></p>', 
        category: 'Property Law', 
        outcome: 'Favorable Judgment', 
        featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
        practiceArea: practiceAreas[3]._id, 
        isPublished: true 
      },
      { 
        title: 'Divorce Case Settled Amicably', 
        description: 'Achieved fair settlement in a complex divorce case with child custody resolved.', 
        content: '<p>Our family law team handled a sensitive divorce case involving asset division and child custody. Through mediation and negotiation, we achieved an amicable settlement that prioritized the best interests of the children while ensuring fair distribution of marital assets.</p><p><strong>Outcome:</strong> Mutual consent divorce decree and shared joint custody agreement.</p><p><em>Note: This is a fictional sample case study.</em></p>', 
        category: 'Family Law', 
        outcome: 'Amicable Settlement', 
        featuredImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
        practiceArea: practiceAreas[1]._id, 
        isPublished: true 
      },
      { 
        title: 'GST Refund Case Successfully Resolved', 
        description: 'Recovered pending GST refund of ₹45 lakhs for a manufacturing company.', 
        content: '<p>A manufacturing company was denied GST refunds amounting to ₹45 lakhs due to technical discrepancies in filing. Our tax team filed rectification applications, represented the client before the GST Commissioner, and successfully secured the full refund with interest.</p><p><strong>Outcome:</strong> Full ₹45 lakh refund sanctioned with statutory interest.</p><p><em>Note: This is a fictional sample case study.</em></p>', 
        category: 'Tax & GST', 
        outcome: 'Full Refund Recovered', 
        featuredImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
        practiceArea: practiceAreas[5]._id, 
        isPublished: true 
      },
      { 
        title: 'Corporate Merger Compliance Success', 
        description: 'Guided a ₹200 crore merger through regulatory compliance seamlessly.', 
        content: '<p>We provided end-to-end legal support for a major corporate merger valued at ₹200 crores. This included due diligence, regulatory filings with SEBI and CCI, shareholder approvals, and post-merger integration compliance.</p><p><strong>Outcome:</strong> Unconditional regulatory clearance within statutory deadlines.</p><p><em>Note: This is a fictional sample case study.</em></p>', 
        category: 'Corporate Law', 
        outcome: 'Merger Approved', 
        featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        practiceArea: practiceAreas[4]._id, 
        isPublished: true 
      },
      { 
        title: 'Consumer Rights Class Action Victory', 
        description: 'Won a consumer class action against a major electronics brand.', 
        content: '<p>We represented a group of 150 consumers who purchased defective electronics. Filed a class action complaint before the National Consumer Commission, resulting in full compensation, product replacement, and a directive for quality improvement.</p><p><strong>Outcome:</strong> ₹1.2 Crore aggregate compensation and immediate product recall.</p><p><em>Note: This is a fictional sample case study.</em></p>', 
        category: 'Consumer Law', 
        outcome: 'Full Compensation Awarded', 
        featuredImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
        practiceArea: practiceAreas[6]._id, 
        isPublished: true 
      }
    ]);

    // Seed Blogs
    await Blog.insertMany([
      { 
        title: 'New Criminal Laws in India: What You Need to Know', 
        content: '<h2>Major Changes in Indian Criminal Law</h2><p>The Indian Parliament has passed three new criminal codes to replace colonial-era legislation. The Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA) bring significant structural changes to how crimes are investigated and prosecuted in India.</p><h3>Key Highlights</h3><ul><li>New definitions for organized crime, cyber terrorism, and economic offenses</li><li>Community service introduced as a progressive penal measure</li><li>Mandatory digital videography of search and seizure operations</li><li>Zero FIR statutory framework strengthened across jurisdictional boundaries</li></ul>', 
        excerpt: 'Understanding the major reforms in Indian criminal law with the introduction of BNS, BNSS, and BSA.', 
        featuredImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        category: blogCategories[0]._id, 
        author: admin._id, 
        tags: ['criminal-law', 'legal-reform', 'india', 'bns'], 
        status: 'published', 
        publishedAt: new Date(), 
        isPublished: true 
      },
      { 
        title: 'Property Registration Process: A Complete Guide', 
        content: '<h2>Step-by-Step Property Registration in India</h2><p>Property acquisition and title transfer requires meticulous legal verification and adherence to the Registration Act. This comprehensive guide details essential prerequisites to guarantee defect-free title acquisition.</p><h3>Crucial Documents Required</h3><ul><li>Original stamped Sale Deed with registered conveyance plan</li><li>Prior title chain deeds for unbroken minimum 30-year span</li><li>Encumbrance Certificate issued by the Sub-Registrar</li><li>Property tax clearance receipts and society No Objection Certificates</li></ul>', 
        excerpt: 'A comprehensive guide to property registration in India, including documents, stamp duty, and the registration process.', 
        featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
        category: blogCategories[2]._id, 
        author: admin._id, 
        tags: ['property-law', 'registration', 'guide', 'real-estate'], 
        status: 'published', 
        publishedAt: new Date(), 
        isPublished: true 
      },
      { 
        title: 'Divorce Laws in India: Rights, Custody and Procedures', 
        content: '<h2>Understanding Matrimonial Rights and Remedies</h2><p>Matrimonial disputes require strategic legal navigation balanced with human sensitivity. Whether exploring mutual consent decrees or contested litigation, knowing your statutory rights is paramount.</p><h3>Key Considerations</h3><ul><li>Child custody orders prioritize the comprehensive welfare and educational interests of the minor</li><li>Maintenance pendente lite and permanent alimony assessments depend on equitable standard-of-living metrics</li><li>Stridhan and separate properties remain the exclusive domain of the respective spouse</li></ul>', 
        excerpt: 'Know your legal rights, custody guidelines, and financial maintenance remedies under personal and secular laws in India.', 
        featuredImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
        category: blogCategories[3]._id, 
        author: admin._id, 
        tags: ['family-law', 'divorce', 'rights', 'custody'], 
        status: 'published', 
        publishedAt: new Date(), 
        isPublished: true 
      }
    ]);

    // Seed FAQs
    await FAQ.insertMany([
      { question: 'How do I book a consultation with JUSTICIA?', answer: 'You can book a consultation directly through our website by clicking the "Book Consultation" button, calling us directly at +91 88790 43210, or messaging our official WhatsApp. We provide both in-person consultations at our New Delhi chambers and secure virtual video conferences for clients worldwide.', category: 'General', order: 1, isPublished: true },
      { question: 'What is your consultation fee structure?', answer: 'Our initial advisory fee is transparently communicated upon appointment scheduling, with no surprise costs. Subsequent professional fees are structured transparently based on case complexity, court jurisdiction, and required document drafting.', category: 'General', order: 2, isPublished: true },
      { question: 'How long does legal litigation typically take?', answer: 'Litigation duration varies based on the judicial forum, complexity of factual dispute, and witness cross-examinations. During your initial consultation, we conduct an exhaustive case assessment and provide realistic milestone timelines.', category: 'Litigation', order: 3, isPublished: true },
      { question: 'Do you represent clients in High Courts and the Supreme Court?', answer: 'Yes. Our senior advocates regularly appear before the Supreme Court of India, Delhi High Court, National Company Law Appellate Tribunal (NCLAT), National Consumer Commission (NCDRC), and specialized central tribunals.', category: 'Services', order: 4, isPublished: true },
      { question: 'What documents should I prepare for our first meeting?', answer: 'Please assemble all relevant agreements, formal notices received or issued, government identity documents, and a chronological timeline of key events. This allows us to formulate targeted legal strategy immediately.', category: 'General', order: 5, isPublished: true }
    ]);

    // Seed Testimonials
    await Testimonial.insertMany([
      { clientName: 'Rohit Sharma', designation: 'Managing Director, Apex Technologies', content: 'JUSTICIA handled our complex corporate contractual dispute with unmatched diligence. Their courtroom command and strategic advice resulted in a complete victory for our firm. Truly premier advocates.', rating: 5, order: 1, isPublished: true },
      { clientName: 'Dr. Ananya Gupta', designation: 'Medical Practitioner', content: 'I am deeply grateful to the family law team at JUSTICIA. During a very difficult custody battle, they provided compassionate guidance, strategic clarity, and ultimately secured a peaceful, favorable settlement for my family.', rating: 5, order: 2, isPublished: true },
      { clientName: 'Uttam Pawan', designation: 'Real Estate Developer', content: 'Their command over property law and title due diligence is extraordinary. They identified hidden title encumbrances that saved us from a multi-crore liability. Highest recommendation.', rating: 5, order: 3, isPublished: true }
    ]);

    // Seed Team Members
    await TeamMember.insertMany([
      { 
        name: 'Adv. Arvind Khanna', 
        designation: 'Senior Partner & Head of Litigation', 
        specialization: 'Criminal Law & Constitutional Litigation', 
        experience: '22+ Years', 
        biography: 'Advocate Arvind Khanna is a revered criminal defense lawyer with over two decades of courtroom experience. He has successfully defended landmark criminal and constitutional matters before the Supreme Court of India and various High Courts.', 
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
        socialLinks: { linkedin: 'https://linkedin.com', email: 'arvind@justicia.com', twitter: 'https://twitter.com' }, 
        order: 1, 
        isPublished: true 
      },
      { 
        name: 'Adv. Amit Sharma', 
        designation: 'Managing Partner', 
        specialization: 'Corporate Governance & Commercial Law', 
        experience: '18+ Years', 
        biography: 'Amit Sharma leads the corporate law and transactional practice. He counsels multinational corporations, venture funds, and startups on cross-border acquisitions, joint ventures, and statutory compliance.', 
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
        socialLinks: { linkedin: 'https://linkedin.com', email: 'amit@justicia.com' }, 
        order: 2, 
        isPublished: true 
      },
      { 
        name: 'Adv. Neha Kapoor', 
        designation: 'Senior Partner', 
        specialization: 'Family & Matrimonial Law', 
        experience: '14+ Years', 
        biography: 'Neha Kapoor specializes in complex matrimonial litigation, cross-border custody disputes, and mediation settlements. She is renowned for her strategic advocacy combined with empathetic counsel.', 
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
        socialLinks: { linkedin: 'https://linkedin.com', email: 'neha@justicia.com' }, 
        order: 3, 
        isPublished: true 
      },
      { 
        name: 'Adv. Rahul Mehta', 
        designation: 'Partner', 
        specialization: 'Property & Real Estate Law', 
        experience: '15+ Years', 
        biography: 'Rahul Mehta directs the real estate and infrastructure division. He possesses extensive experience in RERA litigation, ancestral land partitions, and commercial lease negotiations across India.', 
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        socialLinks: { linkedin: 'https://linkedin.com', email: 'rahul@justicia.com' }, 
        order: 4, 
        isPublished: true 
      }
    ]);

    // Seed Settings
    await WebsiteSetting.deleteMany();
    await WebsiteSetting.create({
      siteName: 'JUSTICIA – Advocates & Legal Consultants',
      tagline: 'Defending Rights. Delivering Justice.',
      contact: {
        address: '123 Legal Avenue, Justice Towers, Civil Lines, New Delhi - 110001',
        phone: '+91 88790 43210',
        email: 'info@justicia.com',
        workingHours: 'Mon - Sat: 9:00 AM - 7:00 PM',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14002.585507567849!2d77.21852435!3d28.67030585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd05b50d96d9%3A0x6b64731c33c2a688!2sCivil%20Lines%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
      },
      socialLinks: {
        facebook: 'https://facebook.com/justicia',
        twitter: 'https://twitter.com/justicia',
        linkedin: 'https://linkedin.com/company/justicia',
        instagram: 'https://instagram.com/justicia',
        youtube: 'https://youtube.com'
      },
      seo: {
        title: 'JUSTICIA – Advocates & Legal Consultants | Best Law Firm in Delhi',
        description: 'JUSTICIA is a premier law firm providing expert legal consultancy in Criminal, Family, Civil, Property, Corporate, Tax, Consumer, Cyber and Labour Law.',
        keywords: ['law firm', 'legal consultancy', 'advocates', 'lawyers', 'delhi', 'criminal law', 'family law', 'corporate law']
      },
      statistics: {
        experience: 15,
        casesWon: 500,
        successRate: 98,
        happyClients: 1000
      }
    });

    console.log('🎉 Auto-seed: Initial data populated successfully in MongoDB!');
  } catch (err) {
    console.error('❌ Auto-seed warning:', err.message);
  }
};

module.exports = autoSeed;

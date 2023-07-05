const Report = require('../model/report.js')

const ReportController = {
    async createReport(req, res) {
        const { content, submitted_at, answered_at,answer_content } = req.body;
        try {
          const dayOffBooking = await Report.create({content, submitted_at, answered_at,answer_content });
          res.status(200).json({ message: 'report created successfully', data: dayOffBooking });
        } catch (error) {
          console.error('Error creating report:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },

      async getAllReports(req, res) {
        try {
          const reports = await Report.findAll();
          res.status(200).json({ message: 'Reports retrieved successfully', data: reports });
        } catch (error) {
          console.error('Error retrieving reports:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },

      async  getReportById(req, res) {
        const reportId = req.params.id; 
        try {
          const report = await Report.findByPk(reportId);   
          if (!report) {
            return res.status(404).json({ error: 'Report not found' });
          }    
          res.status(200).json({ message: 'Report retrieved successfully', data: report });
        } catch (error) {
          console.error('Error retrieving report:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },

      async  updateReport(req, res) {
        const reportId = req.params.id;
        const { content, submitted_at, answered_at, answer_content } = req.body;
        try {
          const report = await Report.findByPk(reportId);
      
          if (!report) {
            return res.status(404).json({ error: 'Report not found' });
          }
          report.content = content;
          report.submitted_at = submitted_at;
          report.answered_at = answered_at;
          report.answer_content = answer_content;
          await report.save(); 
          res.status(200).json({ message: 'Report updated successfully', data: report });
        } catch (error) {
          console.error('Error updating report:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },

      async  deleteReport(req, res) {
        const reportId = req.params.id; 
      
        try {
          const report = await Report.findByPk(reportId);
          if (!report) {

            return res.status(404).json({ error: 'Report not found' });
          }
          await report.destroy();
          res.status(200).json({ message: 'Report deleted successfully' });
        } catch (error) {
          console.error('Error deleting report:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
      


}

module.exports = ReportController